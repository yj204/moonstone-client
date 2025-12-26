import React, { useState, useEffect, useCallback } from "react";
import { TextInput, Button, Portal } from "react-native-paper";
import { View, Pressable, Modal, StyleSheet, Animated, Dimensions } from "react-native";
import { format, parseISO } from "date-fns";
import { FeedEvent } from "@/app/feeding/_layout";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { usePaperTheme } from "@/theme/paperTheme";
import { Text } from "react-native-paper";

type FeedingFormDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (data: Omit<FeedEvent, "id" | "type">) => void;
  defaultAmountMl?: number;
  defaultDuration?: number;
  editingItem?: FeedEvent | null;
  mode?: "add" | "edit";
};

const FeedingFormDialog = ({
  visible,
  onDismiss,
  onConfirm,
  defaultAmountMl = 120,
  defaultDuration = 15,
  editingItem = null,
  mode = "add",
}: FeedingFormDialogProps) => {
  const theme = usePaperTheme();
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [amountMl, setAmountMl] = useState<string>("120");
  const [duration, setDuration] = useState<string>("15");
  const [note, setNote] = useState<string>("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(Dimensions.get("window").height));

  useEffect(() => {
    if (visible) {
      if (mode === "edit" && editingItem) {
        // 수정 모드: 기존 데이터로 초기화
        const itemDate = typeof editingItem.date === "string" 
          ? parseISO(editingItem.date) 
          : new Date(editingItem.date);
        setStartTime(itemDate);
        setAmountMl(String(editingItem.amount_ml || defaultAmountMl));
        setDuration(String(editingItem.duration || defaultDuration));
        setNote(editingItem.note || "");
      } else {
        // 추가 모드: 현재 시간으로 초기화하고 최근 입력값을 기본값으로 설정
        const now = new Date();
        setStartTime(now);
        setAmountMl(String(defaultAmountMl));
        setDuration(String(defaultDuration));
        setNote("");
      }
      // 모달 애니메이션
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, defaultAmountMl, defaultDuration, editingItem, mode, slideAnim]);

  const handleConfirm = () => {
    const amount = parseInt(amountMl, 10);
    const durationMinutes = parseInt(duration, 10);

    if (isNaN(amount) || amount <= 0) {
      return;
    }
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      return;
    }

    onConfirm({
      date: startTime.toISOString(),
      amount_ml: amount,
      duration: durationMinutes,
      note: note,
    });
    onDismiss();
  };

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get("window").height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  const formatDateTime = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm");
  };

  const onDateDismiss = useCallback(() => {
    setDatePickerVisible(false);
  }, []);

  const onDateConfirm = useCallback(
    (params: { date: Date | undefined }) => {
      setDatePickerVisible(false);
      if (params.date) {
        const newDate = new Date(startTime);
        newDate.setFullYear(params.date.getFullYear());
        newDate.setMonth(params.date.getMonth());
        newDate.setDate(params.date.getDate());
        setStartTime(newDate);
      }
    },
    [startTime]
  );

  const onTimeDismiss = useCallback(() => {
    setTimePickerVisible(false);
  }, []);

  const onTimeConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setTimePickerVisible(false);
      const newDate = new Date(startTime);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setStartTime(newDate);
    },
    [startTime]
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={handleDismiss}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={handleDismiss}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  backgroundColor: theme.colors.surface,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.modalHandle} />
              <View style={styles.modalHeader}>
                <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                  {mode === "edit" ? "수유 기록 수정" : "수유 기록 추가"}
                </Text>
              </View>
              <View style={styles.modalBody}>
                <View className="gap-4">
                  <View>
                    <Pressable onPress={() => setDatePickerVisible(true)}>
                      <View pointerEvents="none">
                        <TextInput
                          label="수유 시작 시간"
                          value={formatDateTime(startTime)}
                          mode="outlined"
                          placeholder="yyyy-MM-dd HH:mm"
                          editable={false}
                          right={<TextInput.Icon icon="calendar" />}
                        />
                      </View>
                    </Pressable>
                    <View className="mt-2 flex-row gap-2">
                      <Button
                        mode="outlined"
                        compact
                        onPress={() => setDatePickerVisible(true)}
                      >
                        날짜 선택
                      </Button>
                      <Button
                        mode="outlined"
                        compact
                        onPress={() => setTimePickerVisible(true)}
                      >
                        시간 선택
                      </Button>
                      <Button
                        mode="outlined"
                        compact
                        onPress={() => setStartTime(new Date())}
                      >
                        지금
                      </Button>
                    </View>
                  </View>
                  <TextInput
                    label="수유량 (ml)"
                    value={amountMl}
                    onChangeText={setAmountMl}
                    mode="outlined"
                    keyboardType="numeric"
                  />
                  <TextInput
                    label="수유 시간 (분)"
                    value={duration}
                    onChangeText={setDuration}
                    mode="outlined"
                    keyboardType="numeric"
                  />
                  <TextInput
                    label="메모 (선택사항)"
                    value={note}
                    onChangeText={setNote}
                    mode="outlined"
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
              <View style={styles.modalActions}>
                <Button onPress={handleDismiss}>취소</Button>
                <Button mode="contained" onPress={handleConfirm}>
                  확인
                </Button>
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Modal>
      <DatePickerModal
        locale="ko"
        mode="single"
        visible={datePickerVisible}
        onDismiss={onDateDismiss}
        date={startTime}
        onConfirm={onDateConfirm}
      />
      <TimePickerModal
        visible={timePickerVisible}
        onDismiss={onTimeDismiss}
        onConfirm={onTimeConfirm}
        hours={startTime.getHours()}
        minutes={startTime.getMinutes()}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: Dimensions.get("window").height * 0.9,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 8,
  },
});

export default FeedingFormDialog;


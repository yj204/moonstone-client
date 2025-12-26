import React, { useState, useEffect, useCallback } from "react";
import { TextInput, Button, Portal, SegmentedButtons } from "react-native-paper";
import { View, Pressable, Modal, StyleSheet, Animated, Dimensions } from "react-native";
import { format, parseISO } from "date-fns";
import { FeedEvent } from "@/app/feeding/_layout";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { usePaperTheme } from "@/theme/paperTheme";
import { Text } from "react-native-paper";

type DiaperType = "normal" | "constipation" | "diarrhea";

type DiaperFormDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (data: Omit<FeedEvent, "id" | "type"> & { diaperType?: DiaperType }) => void;
  editingItem?: FeedEvent | null;
  mode?: "add" | "edit";
};

const DiaperFormDialog = ({
  visible,
  onDismiss,
  onConfirm,
  editingItem = null,
  mode = "add",
}: DiaperFormDialogProps) => {
  const theme = usePaperTheme();
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [diaperType, setDiaperType] = useState<DiaperType>("normal");
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
        setDiaperType((editingItem as any).diaperType || "normal");
        setNote(editingItem.note || "");
      } else {
        // 추가 모드: 현재 시간으로 초기화
        const now = new Date();
        setStartTime(now);
        setDiaperType("normal");
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
  }, [visible, editingItem, mode, slideAnim]);

  const handleConfirm = () => {
    onConfirm({
      date: startTime.toISOString(),
      note: note,
      diaperType: diaperType,
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
        // 날짜 선택 후 시간 선택 모달 자동으로 열기
        setTimeout(() => {
          setTimePickerVisible(true);
        }, 300); // datepicker가 완전히 닫힌 후 timepicker 열기
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

  const diaperTypeLabels: Record<DiaperType, string> = {
    normal: "정상",
    constipation: "변비",
    diarrhea: "설사",
  };

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
                  {mode === "edit" ? "배변 기록 수정" : "배변 기록 추가"}
                </Text>
              </View>
              <View style={styles.modalBody}>
                <View className="gap-4">
                  <View>
                    <Pressable onPress={() => setDatePickerVisible(true)}>
                      <View pointerEvents="none">
                        <TextInput
                          label="배변 시간"
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
                        onPress={() => setStartTime(new Date())}
                      >
                        지금
                      </Button>
                    </View>
                  </View>
                  <View>
                    <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
                      배변 타입
                    </Text>
                    <SegmentedButtons
                      value={diaperType}
                      onValueChange={(value) => setDiaperType(value as DiaperType)}
                      buttons={[
                        {
                          value: "normal",
                          label: diaperTypeLabels.normal,
                        },
                        {
                          value: "constipation",
                          label: diaperTypeLabels.constipation,
                        },
                        {
                          value: "diarrhea",
                          label: diaperTypeLabels.diarrhea,
                        },
                      ]}
                    />
                  </View>
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
        label="Select Date"
        saveLabel="Save"
        mode="single"
        animationType="slide"
        presentationStyle="pageSheet"
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

export default DiaperFormDialog;


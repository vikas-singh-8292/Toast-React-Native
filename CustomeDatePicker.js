/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Button,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";

const CustomCalendarPicker = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        toggleModal();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{width:'80%',height:50,alignItems:'center',justifyContent:'center',
                backgroundColor:'#0E469F',borderRadius:10,marginTop:20}} onPress={toggleModal}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>Open Calendar</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select a Date</Text>

                        <Calendar
                            onDayPress={onDayPress}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: "#007BFF" },
                            }}
                            theme={{
                                backgroundColor: "#ffffff",
                                calendarBackground: "#fff",
                                textSectionTitleColor: "#b6c1cd",
                                selectedDayBackgroundColor: "#007BFF",
                                selectedDayTextColor: "#ffffff",
                                todayTextColor: "#007BFF",
                                dayTextColor: "#2d4150",
                                textDisabledColor: "#d9e1e8",
                                arrowColor: "#007BFF",
                                monthTextColor: "#007BFF",
                            }}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.closeButton]}
                                onPress={toggleModal}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {selectedDate ? (
                <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: 320,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    selectedDate: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    closeButton:{
        backgroundColor: "red",
    },
});
export default CustomCalendarPicker;
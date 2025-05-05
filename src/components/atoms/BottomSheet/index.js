import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

const BottomSheet = ({bottomSheetTogle}) => {
  const [isVisible, setIsVisible] = useState(false);

  const openBottomSheet = () => setIsVisible(true);
  const closeBottomSheet = () => setIsVisible(false);

  return (
    <View style={styles.container}>
      {/* Button to Open BottomSheet */}
      <TouchableOpacity style={styles.button} onPress={openBottomSheet}>
        <Text style={styles.buttonText}>Open BottomSheet</Text>
      </TouchableOpacity>

      {/* BottomSheet Modal */}
      <Modal
        transparent
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <View style={styles.overlay}>
          {/* Close Area */}
          <TouchableOpacity
            style={styles.closeArea}
            onPress={closeBottomSheet}
          />

          {/* BottomSheet Content */}
          <Animated.View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>Bottom Sheet</Text>
            <Text style={styles.sheetContent}>This is a custom bottom sheet!</Text>

            <TouchableOpacity style={styles.closeButton} onPress={closeBottomSheet}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  closeArea: {
    flex: 1, // Area to detect clicks outside the bottom sheet
  },
  bottomSheet: {
    height: height * 0.4, // Bottom sheet height (40% of screen)
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 1000, // Ensure the sheet stays on top
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sheetContent: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BottomSheet;

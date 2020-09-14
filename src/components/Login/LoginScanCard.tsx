import React, { FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DarkButton } from "../Layout/Buttons/DarkButton";
import { size, color } from "../../common/styles";
import { Card } from "../Layout/Card";
import { AppText } from "../Layout/AppText";
import i18n from "i18n-js";

const styles = StyleSheet.create({
  scanButtonWrapper: {
    marginTop: size(3)
  }
});

interface LoginScanCard {
  onToggleScanner: () => void;
  isLoading: boolean;
}

export const LoginScanCard: FunctionComponent<LoginScanCard> = ({
  onToggleScanner,
  isLoading
}) => {
  return (
    <Card>
      <AppText>{i18n.t("loginScanCard.loginWithQR")}</AppText>
      <View style={styles.scanButtonWrapper}>
        <DarkButton
          text={i18n.t("loginScanCard.scanToLogin")}
          onPress={onToggleScanner}
          icon={
            <Feather name="maximize" size={size(2)} color={color("grey", 0)} />
          }
          fullWidth={true}
          isLoading={isLoading}
        />
      </View>
    </Card>
  );
};

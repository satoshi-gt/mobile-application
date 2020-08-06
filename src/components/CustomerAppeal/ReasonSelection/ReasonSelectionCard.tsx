import React, { FunctionComponent } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { CustomerCard } from "../../CustomerQuota/CustomerCard";
import { size } from "../../../common/styles";
import { Card } from "../../Layout/Card";
import { ReasonSelectionHeader } from "./ReasonSelectionHeader";
import { ReasonItem } from "./ReasonItem";
import { SecondaryButton } from "../../Layout/Buttons/SecondaryButton";

const styles = StyleSheet.create({
  commonPadding: {
    padding: size(2),
    paddingTop: size(0.5)
  },
  backbuttonComponent: {
    marginTop: size(5)
  }
});

export type Reason = {
  description: string;
  descriptionAlert: string | undefined;
};

interface ReasonSelectionCard {
  ids: string[];
  reasonSelectionHeader: string;
  reasons: Reason[];
  onCancel: () => void;
  onReasonSelection: (productName: string) => void;
}

export const ReasonSelectionCard: FunctionComponent<ReasonSelectionCard> = ({
  ids,
  reasonSelectionHeader,
  reasons,
  onCancel,
  onReasonSelection
}) => {
  return (
    <View>
      <CustomerCard ids={ids}>
        <Card>
          <View style={styles.commonPadding}>
            <ReasonSelectionHeader title={reasonSelectionHeader} />
          </View>
          <View style={styles.commonPadding}>
            {reasons.map(reason => (
              <ReasonItem
                key={reason.description}
                description={reason.description}
                descriptionAlert={reason.descriptionAlert}
                isLast={reasons[reasons.length - 1] === reason}
                onReasonSelection={onReasonSelection}
              />
            ))}
          </View>
        </Card>
      </CustomerCard>
      <View style={styles.backbuttonComponent}>
        <SecondaryButton
          text="Cancel"
          onPress={() => {
            Alert.alert("Cancel appeal?", undefined, [
              {
                text: "No"
              },
              {
                text: "Yes",
                onPress: onCancel,
                style: "destructive"
              }
            ]);
          }}
          fullWidth={true}
        />
      </View>
    </View>
  );
};
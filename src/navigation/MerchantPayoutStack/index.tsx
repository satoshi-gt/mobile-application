import {
  createStackNavigator,
  StackViewTransitionConfigs
} from "react-navigation-stack";
import MerchantPayoutScreen from "./MerchantPayoutScreen";
import PayoutFeedbackScreen from "./PayoutFeedbackScreen";
import React, { FunctionComponent, useContext } from "react";
import { NavigationInjectedProps } from "react-navigation";
import { AuthStoreContext } from "../../context/authStore";
import { CampaignConfigsStoreContext } from "../../context/campaignConfigsStore";
import { AuthContextProvider } from "../../context/auth";
import { CampaignConfigContextProvider } from "../../context/campaignConfig";

const Stack = createStackNavigator(
  {
    MerchantPayoutScreen: {
      screen: MerchantPayoutScreen
    },
    PayoutFeedbackScreen: {
      screen: PayoutFeedbackScreen
    }
  },
  {
    headerMode: "none",
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
    navigationOptions: {
      gesturesEnabled: true
    },
    initialRouteName: "MerchantPayoutScreen"
  }
);

const MerchantPayoutStack: FunctionComponent<NavigationInjectedProps> & {
  router: unknown;
} = ({ navigation }) => {
  const operatorToken = navigation.getParam("operatorToken");
  const endpoint = navigation.getParam("endpoint");

  const key = `${operatorToken}${endpoint}`;

  const { authCredentials } = useContext(AuthStoreContext);
  if (!authCredentials[key]) {
    throw new Error("No auth credentials found");
  }

  const { allCampaignConfigs } = useContext(CampaignConfigsStoreContext);
  if (!allCampaignConfigs[key]) {
    throw new Error("No campaign config found");
  }

  return (
    <AuthContextProvider authCredentials={authCredentials[key]!}>
      <CampaignConfigContextProvider campaignConfig={allCampaignConfigs[key]!}>
        <Stack navigation={navigation} />
      </CampaignConfigContextProvider>
    </AuthContextProvider>
  );
};

MerchantPayoutStack.router = Stack.router;

export default MerchantPayoutStack;

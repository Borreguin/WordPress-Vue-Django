import React, { useState } from "react";
import {
  Button,
  Center,
  Divider,
  FormControl,
  Input,
  ScrollView,
  useBreakpointValue,
  View,
  VStack,
} from "native-base";
import Styles from "./LoginForm.style";
import { useTranslation } from "react-i18next";
import { background } from "../../styles/colors";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

import { bkpCentralPanel, bkpColumnToRow } from "../../styles/breakpoints";
import { HSeparator } from "../common/Separators/Separators";
import { Logo } from "../common/Logo/Logo";
import { getToken, revokeToken } from "../../store/slices/loginSlice";
import { connect } from "react-redux";
import CustomAlert from "../common/CustomAlert/CustomAlert";

const LoginForm = (props) => {
  const { isLoggedIn, loginAction, loginMsg, logoutAction } = props;

  const { t } = useTranslation();
  const flexDir = useBreakpointValue(bkpColumnToRow);
  const centralPanel = useBreakpointValue(bkpCentralPanel);

  const LoginSection = () => {
    const [show, setShow] = React.useState(false);
    const [userNameOrMail, setUserNameOrMail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <FormControl isRequired>
        <VStack>
          <FormControl.Label>{t("username")}</FormControl.Label>
          <Input
            placeholder={t("usernameHolder")}
            onChangeText={setUserNameOrMail}
            value={userNameOrMail}
          />
          <FormControl.Label>{t("password")}</FormControl.Label>
          <Input
            type={show ? "text" : "password"}
            placeholder={t("passwordHolder")}
            onChangeText={setPassword}
            value={password}
            InputRightElement={
              <FontAwesomeIcon
                name="eye-slash"
                size={24}
                onPress={() => setShow(!show)}
                style={{ marginRight: 1 }}
              />
            }
          />
          <Divider my="3" bg={"transparent.100"} />
          <Button onPress={() => loginAction(userNameOrMail, password)}>
            {t("login")}
          </Button>
        </VStack>
      </FormControl>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} minH={"93vh"}>
      <View
        style={{
          flexDirection: flexDir,
          justifyContent: "center",
          alignItems: "center",
        }}
        minH={"93vh"}
      >
        <Center p={0} w={centralPanel}>
          <Logo />
        </Center>
        <HSeparator />
        <Center
          bg={background.default}
          style={[Styles.LoginForm]}
          w={centralPanel}
        >
          {!isLoggedIn ? (
            <LoginSection />
          ) : (
            <Button onPress={() => logoutAction()} w={"100%"}>
              {t("logout")}
            </Button>
          )}

          <CustomAlert status={"info"} msg={loginMsg} />
        </Center>
      </View>
    </ScrollView>
  );
};

// LoginForm.propTypes = {};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    loginMsg: state.login.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (userNameOrMail, password) =>
      dispatch(getToken(userNameOrMail, password)),
    logoutAction: () => dispatch(revokeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

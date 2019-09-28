import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { Component } from "react";

import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import oauth from "oauth";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AdmobBanner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword("foobar");

type Props = {};
class MissionList extends Component<Props> {
  componentDidMount() {
    axios.post();
  }

  render() {
    return (
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
        forceInset={{ top: "never" }}
      >
        <TouchableOpacity>
          <Text>Login MQL5</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(MissionList);

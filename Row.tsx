import { Text, View } from "react-native";
import React, { useState } from "react";
import { DEFAULT_ROWS_STATE } from "./App";

const Col = ({ numRows, children }) => {
  return  (
    <View style={{
      borderColor:  "#fff",
      borderWidth:  1,
      flex:  1}}>{children}</View>
  )
}

const Row = ({ children }) => (
  <View style={{ flexDirection: "row", justifyContent: 'space-between'}}>{children}</View>
)

const RowComponent = ({rowState = {}, matchesState, id, currentRow}) =>{

  const localRowState = rowState ?? DEFAULT_ROWS_STATE

  const onBoxBgColor = (value): string => {
    switch (true){
      case matchesState?.nonExists?.includes(value): return 'gray';
      case matchesState?.exists?.includes(value): return 'orange';
      case matchesState?.existsInTheSamePosition?.includes(value): return 'green';
      default: return 'white'
    }
  }

  return (
    <Row>
      <Col numRows={1}>
        <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: onBoxBgColor(localRowState["1"])}}>
          <Text>{localRowState["1"]}</Text>
        </View>
      </Col>
      <Col numRows={1}>
        <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: onBoxBgColor(localRowState["2"])}}>
          <Text>{localRowState["2"]}</Text>
        </View>
      </Col>
      <Col numRows={1}>
        <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: onBoxBgColor(localRowState["3"])}}>
          <Text>{localRowState["3"]}</Text>
        </View>
      </Col>
      <Col numRows={1}>
        <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: onBoxBgColor(localRowState["4"])}}>
          <Text>{localRowState["4"]}</Text>
        </View>
      </Col>
      <Col numRows={1}>
        <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: onBoxBgColor(localRowState["5"])}}>
          <Text>{localRowState["5"]}</Text>
        </View>
      </Col>
      <Col numRows={1}>
        <View style={{width: 50, height: 50, borderColor: 'gray', borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: onBoxBgColor(localRowState["6"])}}>
          <Text>{localRowState["6"]}</Text>
        </View>
      </Col>
    </Row>
  )
}

export default RowComponent;

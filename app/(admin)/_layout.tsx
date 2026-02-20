import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Adminlayout = () => {
  return (
   <Stack >
    <Stack.Screen name="party" options={{headerShown:true,title:"Manage Parties",headerBackVisible:true}} />
    <Stack.Screen name="sources" options={{headerShown:true,title:"Manage Sources",headerBackVisible:true}} />
   </Stack>
  )
}

export default Adminlayout

const styles = StyleSheet.create({})

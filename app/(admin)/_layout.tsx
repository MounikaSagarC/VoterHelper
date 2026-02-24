import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Adminlayout = () => {
  return (
   <Stack screenOptions={{headerShown:true}}>
    <Stack.Screen name="party" options={{title:"Manage Parties",headerBackVisible:true}} />
    <Stack.Screen name="sources" options={{title:"Manage Sources",headerBackVisible:true}} />
    <Stack.Screen name="candidate" options={{title:"Candidates",headerBackVisible:true}} />
    <Stack.Screen name="category" options={{title:"Categories",headerBackVisible:true}} />
    <Stack.Screen name="officeTypes" options={{title:"Office Types",headerBackVisible:true}} />
    <Stack.Screen name="questions" options={{title:"Questions",headerBackVisible:true}} />
   </Stack>
  )
}

export default Adminlayout

const styles = StyleSheet.create({})

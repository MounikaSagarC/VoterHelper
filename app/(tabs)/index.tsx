import DashboardScreen from "@/components/screens/AdminScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import SearchBar from "@/components/SearchBar";
import { useIsAdmin } from "@/lib/helpers/auth";
import { useState } from "react";
import { Text } from "react-native";

const Index = () => {
  const isAdmin = useIsAdmin();


  return (
    <>
      {isAdmin ? (
        <>
        <DashboardScreen/>
        </>
      ) 
      : (
        <>
          <HomeScreen />
        </>
      )}
    </>
  );
};

export default Index;

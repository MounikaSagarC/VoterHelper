import DashboardScreen from "@/components/screens/AdminScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import SearchBar from "@/components/SearchBar";
import { useAuthStore } from "@/store/auth_store";
import { useState } from "react";
import { Text } from "react-native";

const Index = () => {
  const  userRole  = useAuthStore((s)=>(s.userRole)
)
  const isAdmin = (userRole === 'SUPER_ADMIN');


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

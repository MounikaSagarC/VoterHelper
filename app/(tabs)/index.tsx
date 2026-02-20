import HomeScreen from "@/components/screens/HomeScreen";
import { useIsAdmin } from "@/lib/helpers/auth";
import { Text } from "react-native";

const Index = () => {
  const isAdmin = useIsAdmin();
  return (
    <>
      {isAdmin ? (
        <Text>Welcome to AdminDashboard</Text>
      ) : (
        <>
          <HomeScreen/>
        </>
      )}
    </>
  );
};

export default Index;

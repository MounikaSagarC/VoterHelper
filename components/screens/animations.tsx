import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("screen");

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

export type Event = {
  title: string;
  location: string;
  date: string;
  poster: string;
};

export const DATA: Event[] = [
  {
    title: "Afro vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg",
  },
  {
    title: "Jungle Party",
    location: "Unknown",
    date: "Sept 3rd, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg",
  },
  {
    title: "4th Of July",
    location: "New York, USA",
    date: "Oct 11th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg",
  },
  // ... more events
];

type RootStackParamList = {
  App: undefined;
  EventList: { item: Event };
};

type AppProps = NativeStackScreenProps<RootStackParamList, "App">;
type EventListProps = NativeStackScreenProps<RootStackParamList, "EventList">;

const OverflowItems: React.FC<{ data: Event[]; scrollXAnimated: Animated.Value }> = ({
  data,
  scrollXAnimated,
}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.itemContainerRow}>
              <Text style={styles.location}>
                <EvilIcons
                  name="location"
                  size={16}
                  color="black"
                  style={{ marginRight: 5 }}
                />
                {item.location}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const App: React.FC<AppProps> = () => {
  const [data, setData] = React.useState<Event[]>(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const router = useRouter()

  const setActiveIndex = React.useCallback((activeIndex: number) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // Load more data
      const newData = [...data, ...data];
      setData(newData);
    }
  }, [index, data]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXIndex]);

  React.useEffect(() => {
      
      const timer = setInterval(() => {
        const nextIndex = (index + 1) % data.length;
        setActiveIndex(nextIndex);
      }, 3000); 
  
      return () => clearInterval(timer);
    }, [index, data.length]); 

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .runOnJS(true)
    .onEnd(() => {
      if (index < data.length - 1) setActiveIndex(index + 1);
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .runOnJS(true)
    .onEnd(() => {
      if (index > 0) setActiveIndex(index - 1);
    });

  const combinedGesture = Gesture.Race(flingLeft, flingRight);

  return (
    <GestureDetector gesture={combinedGesture}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
        <FlatList
          data={data}
          keyExtractor={(_, idx) => String(idx)}
          horizontal
          inverted
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            padding: SPACING * 2,
            marginTop: 50,
          }}
          scrollEnabled={false}
          removeClippedSubviews={false}
          CellRendererComponent={({ item, index, children, style, ...props }) => (
            <View style={[style, { zIndex: data.length - index }]} {...props}>
              {children}
            </View>
          )}
          renderItem={({ item, index: i }) => {
            const inputRange = [i - 1, i, i + 1];
            const translateX = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [50, 0, -100],
            });
            const scale = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [0.8, 1, 1.3],
            });
            const opacity = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
            });

            return (
              <Animated.View
                style={{
                  position: "absolute",
                  left: -ITEM_WIDTH / 2,
                  opacity,
                  transform: [{ translateX }, { scale }],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push({pathname:"/eventlist",params:{item:JSON.stringify(item)}})}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </SafeAreaView>
    </GestureDetector>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});

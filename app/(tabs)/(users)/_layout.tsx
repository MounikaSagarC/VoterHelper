import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='electionCandidates' options={{title:"Election wise Candidates", headerShown:true}}/>
      <Stack.Screen name='elections' options={{title:"Elections"}}/>
      <Stack.Screen name='practice' options={{headerShown:false,title:"Elections"}}/>
    </Stack>
  )
}

export default _layout

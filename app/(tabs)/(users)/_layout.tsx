import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='electionCandidates' options={{title:"Election wise Candidates", headerShown:true}}/>
      <Stack.Screen name='elections' options={{headerShown:false,}}/>
    </Stack>
  )
}

export default _layout

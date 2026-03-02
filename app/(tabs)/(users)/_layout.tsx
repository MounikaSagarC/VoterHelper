import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='electionCandidates' options={{title:"ElectedCandidates"}}/>
      <Stack.Screen name='elections' options={{title:"Elections"}}/>
    </Stack>
  )
}

export default _layout

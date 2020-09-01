// We use any for now since I am not able to determine the type.
// We can provide an interface of the expected structure of the array/subarray
// But I am  not sure if this is good practise as the API might change later
export default function generateErrorMessageArray(errorArray: any) {
  return errorArray.message.map((subArray: any) =>
    subArray.messages.map((messageObject: any) => messageObject.message)
  )
}

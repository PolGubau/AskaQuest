export default function usePascalCase(string:string) {
  const stringFirstLetter = string[0].toUpperCase()
  const restOfstring = string.slice(1)
  string = stringFirstLetter + restOfstring
  return string
}

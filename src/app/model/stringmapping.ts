export class StringMapping {
  static dayStrings: string[] = ['','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  static dayShortStrings: string[] = ['','Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  public static getDayString(index: number) : string
  {
    return StringMapping.dayStrings[index];
  }
  public static getDayShortString(index: number) : string
  {
    return StringMapping.dayShortStrings[index];
  }
}

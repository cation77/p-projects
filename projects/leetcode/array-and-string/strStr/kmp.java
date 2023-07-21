// public class KMP {
//   private int[] next;
//   private String pat;

//   private int[] buildNext(String pat) {
//     int m = pat.length;
//     int j = 0;
//     int[] N = new int[m];
//     int t = N[0] = -1;
//     while(j < m - 1) {
//       if (0 > t || pat.charAt(j) == pat.charAt(t)) {
//         t++;
//         j++;
//         if (pat.charAt(j) != pat.charAt(t)) {
//           N[j] = t;
//         } else {
//           N[j] = N[t];
//         }
//       } else {
//         t = N[t];
//       }
//     }
//     return N;
//   }

//   public KMP(String pat) {
//     this.pat = pat;
//     this.next = this.buildNext(pat);
//   }

//   public int search(String txt) {
//     int s = txt.length;
//     int p = this.pat.length;
//     int i = 0;
//     int j = 0;
//     while(i < s && j < p) {
//       if (txt.charAt(i) == this.pat.charAt(j)) {
//         i++;
//         j++;
//       } else {
//         j = this.next[j];
//       }
//     }
//     if (j == p) {
//       return i - j;
//     }
//     return -1;
//   }
// }

public class KMP {
  public static int kmpSearch(String text, String pattern) {
      // 构建模式串的失败函数表
      int[] failureTable = buildFailureTable(pattern);

      // 文本串和模式串的索引
      int textIndex = 0;
      int patternIndex = 0;

      while (textIndex < text.length()) {
          if (pattern.charAt(patternIndex) == text.charAt(textIndex)) {
              // 如果当前字符匹配成功，则继续比较下一个字符
              if (patternIndex == pattern.length() - 1) {
                  // 如果模式串已经匹配完全，返回在文本串中的起始位置
                  return textIndex - patternIndex;
              }
              patternIndex++;
              textIndex++;
          } else if (patternIndex > 0) {
              // 如果当前字符匹配失败且已经有部分匹配，则回溯到上一个匹配位置
              patternIndex = failureTable[patternIndex - 1];
          } else {
              // 如果当前字符匹配失败且没有部分匹配，则继续比较下一个字符
              textIndex++;
          }
      }
      
      // 没有找到匹配的模式串
      return -1;
  }

  private static int[] buildFailureTable(String pattern) {
      // 创建失败函数表
      int[] failureTable = new int[pattern.length()];
      int patternIndex = 0;

      for (int i = 1; i < pattern.length(); i++) {
          if (pattern.charAt(i) == pattern.charAt(patternIndex)) {
              // 当前字符匹配成功，则失败函数值为匹配长度加一
              failureTable[i] = patternIndex + 1;
              patternIndex++;
          } else if (patternIndex > 0) {
              // 当前字符匹配失败且已经有部分匹配，则回溯到上一个匹配位置
              patternIndex = failureTable[patternIndex - 1];
              i--;
          } else {
              // 当前字符匹配失败且没有部分匹配，则失败函数值为0
              failureTable[i] = 0;
          }
      }

      return failureTable;
  }

  public static void main(String[] args) {
      String text = "ABABDABACDABABCABAB";
      String pattern = "ABABCABAB";
      int index = kmpSearch(text, pattern);
      if (index != -1) {
          System.out.println("Pattern found at index " + index);
      } else {
          System.out.println("Pattern not found");
      }
  }
}

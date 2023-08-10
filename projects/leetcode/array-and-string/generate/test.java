private List<List<Integer>> generate(int numRows) {
    List<List<Integer>> resultList = new ArrayList<>();
    
    for (int i = 0; i < numRows; i++) {
        List<Integer> rowList = new ArrayList<>();
        rowList.add(1);
        
        for (int j = 1; j < i; j++) {
            List<Integer> prevRow = resultList.get(i - 1);
            int num = prevRow.get(j - 1) + prevRow.get(j);
            rowList.add(num);
        }
        
        if (i > 0) {
            rowList.add(1);
        }
        
        resultList.add(rowList);
    }
    
    return resultList;
}

public class ReverseStr {
    
    private static String reverseStr(String str){
    return new StringBuilder().append(str).reverse().toString();
    }

    public static void main(String[] args){
        System.out.println(reverseStr("test"));
    } 
}


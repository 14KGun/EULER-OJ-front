const toArray = (lang) => {
    const source_cpp = ['#include <iostream>','','int main() {','\tprintf("Hello Euler!");','\treturn 0;','}'];
    const source_python2 = ['print "Hello Euler!"'];
    const source_python3 = ['print("Hello Euler!")'];
    const source_c = ['#include <stdio.h>','','int main() {','\tprintf("Hello Euler!");','\treturn 0;','}'];
    const source_java = ['public class Main {','\tpublic static void main(String[] args) {','\t\tSystem.out.println("Hello Euler!");','\t}','}'];
    const source_r = ['cat("Hello Euler!")'];
    let source = [];
    
    if(lang.indexOf('Python2')!=-1) source = source_python2;
    else if(lang.indexOf('Python')!=-1 || lang.indexOf('PyPy')!=-1) source = source_python3;
    else if(lang.indexOf('Java')!=-1) source = source_java;
    else if(lang.indexOf('C++')!=-1) source = source_cpp;
    else if(lang.indexOf('C')!=-1) source = source_c;
    else if(lang.indexOf('R')!=-1) source = source_r;
    
    return source;
}

const toString = (lang) => toArray(lang).join('\n');

const defaultCode = { toArray, toString };
export default defaultCode;
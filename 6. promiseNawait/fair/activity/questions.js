module.exports = [
  {
    "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    "Description": "Question 1",
    "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    "Input Format": "Integer",
    "Constraints": "n <= 10 ^ 9",
    "Output Format": "String",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "7",
        "Output": "Prime"
      },
      {
        "Input": "9",
        "Output": "Not Prime"
      }
    ]
  },
  {
    "Challenge Name": "Pep_Java_1GettingStarted_2PrimesTillN",
    "Description": "Question 2",
    "Problem Statement": "Take as input n. Determine all prime numbers till n and print them on the same line with spaces in between",
    "Input Format": "Integer",
    "Constraints": "n <= 10 ^ 9",
    "Output Format": "String",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "7",
        "Output": "2 3 5 7"
      },
      {
        "Input": "20",
        "Output": "2 3 5 7 11 13 17 19"
      }
    ]
  },
  {
    "Challenge Name": "Pep_Java_1GettingStarted_3ReverseNumber",
    "Description": "Question 3",
    "Problem Statement": "Take as input n. Print the number in reverse.",
    "Input Format": "Integer",
    "Constraints": "n <= 10 ^ 9",
    "Output Format": "Integer",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "92345",
        "Output": "54329"
      },
      {
        "Input": "10058",
        "Output": "85001"
      }
    ]
  },
  {
    "Challenge Name": "Pep_Java_1GettingStarted_4GCD",
    "Description": "Question 4",
    "Problem Statement": "Take as input two numbers n1 and n2. Calcualte their gcd. Print it.",
    "Input Format": "Integer",
    "Constraints": "n1 <= 10 ^ 9  n2 <= 10 ^ 9",
    "Output Format": "Integer",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "52 60",
        "Output": "4"
      },
      {
        "Input": "48 84",
        "Output": "12"
      }
    ]
  },

  {
    "Challenge Name": "Pep_Java_1GettingStarted_5Fib",
    "Description": "Question 5",
    "Problem Statement": "Take as input a number n. \nPrint the nth number of Fibonacci sequence where  \n0th Fibonacci is 0 and 1st Fibonacci is 1. Here is a sample\n0 1 1 2 3 5 8 13 21 34 55",
    "Input Format": "Integer",
    "Constraints": "n1 <= 10 ^ 9  n2 <= 10 ^ 9",
    "Output Format": "Integer",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "52 60",
        "Output": "4"
      },
      {
        "Input": "48 84",
        "Output": "12"
      }
    ]
  },
  {
    "Challenge Name": "Pep_Java_1GettingStarted_6FibTillN",
    "Description": "Question 6",
    "Problem Statement": "Take as input a number n.\nPrint all terms of Fibonacci sequence smaller than \nequal to n where\n0th Fibonacci is 0 and 1st Fibonacci is 1. Here is a sample0 1 1 2 3 5 8 13 21 34 55",
    "Input Format": "Integer",
    "Constraints": "n1 <= 10 ^ 9  n2 <= 10 ^ 9",
    "Output Format": "Integer",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "52 60",
        "Output": "4"
      },
      {
        "Input": "48 84",
        "Output": "12"
      }
    ]
  }, {
    "Challenge Name": "Pep_Java_1GettingStarted_7Pattern1",
    "Description": "Question 7",
    "Problem Statement": `Take as input a number n, the number of rows  
    Print the following pattern  
    *  
    *	*  
    *	*	*  
    *	*	*	*  
    *	*	*	*	*  
    for n = 5.`,
    "Input Format": "Integer",
    "Constraints": "n1 <= 10 ^ 9  n2 <= 10 ^ 9",
    "Output Format": "Integer",
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "5",
        "Output": `*  
        *	*  
        *	*	*  
        *	*	*	*  
        *	*	*	*	*  `
      }
    ]
  }, {
    "Challenge Name": "Pep_Java_1GettingStarted_8Pattern2",
    "Description": "Question 8",
    "Problem Statement": `Take as input a number n, the number of rows
    Print the following pattern
      *
     ***
    *****
     ***
      *
    for n = 5.`,
    "Input Format": "Integer",
    "Constraints": "n1 <= 10 ^ 9  n2 <= 10 ^ 9",
    "Output Format": `Pattern for n = 5.
    *  
   ***  
  *****  
   ***  
    * `,
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": "5",
        "Output":
          ` *
        ***
       *****
        ***
         *`
      },
      {
        "Input": "3",
        "Output": ` *
                   ***
                    *`
      }
    ]
  }, {
    "Challenge Name": "Pep_Java_2NumberSystemAndFunctions_4Series",
    "Description": "Question 4",
    "Problem Statement": `Take as input
    1. first number: a
    2. common difference for the AP: d
    3. common ratio for the GP: r
    4. number of elements: n
    
    Let us assume fap is the nth number of AP
    Let us assume fgp is the nth number of GP
    Let us assume fagp is the nth number of AGP
    Let us assume sap is the sum of first n number of AP
    Let us assume sgp is the sum of first n number of GP
    Let us assume sagp is the sum of first n number of AGP
    Print fap, fgp, fagp, sap, sgp, sagp separated by a space on the same line`,
    "Input Format": `Integer representing a
    Integer representing d
    Integer representing r
    Integer representing n`,
    "Constraints": `1 <= a <= 10 ^ 9
                    1 <= d <= 100
                    1 <= r <= 10
                    1 <= n <= 5`,
    "Output Format": `fap fgp fagp sap sgp sagp`,
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": `10
                  5
                  2
                  5`,
        "Output": "30 160 480 100 310 800"
      },
      {
        "Input": `5
                  5
                  5
                  5`,
        "Output": "25 3125 15625 75 3905 18555"
      }
    ]
  }, {
    "Challenge Name": "Pep_Java_2NumberSystemAndFunctions_5IsArmstrong",
    "Description": "IsArmstrong",
    "Problem Statement": `Take as input
    1. Armstrong Number: arn
    2. Start Range: sr
    3. End Range: er
    
    Check whether arn is an Armstrong Number on not, and in next line
    print all Armstrong Number till er separated by space.
    
    All Armstrong numbers in the range of
    0 and 999.  An Armstrong number is a number such that the sum
    of its digits raised to the n power(where n is the number of digits in er)
    is equal to the number
    itself.  For example, 371 is an Armstrong number, since n =3 and er 999
    3**3 + 7**3 + 1**3 = 371.`,
    "Input Format": `Integer representing arn
    Integer representing er`,
    "Constraints": `1 <= arn <= 10 ^ 9
    1 <= er <= 10 ^ 9`,
    "Output Format": `boolean representing whether arn is Armstong or not
    All Armstrong Number in that range. Each Armstrong Number separated by space(" ")`,
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": `371
                    1
                  999`,
        "Output": `true
        1 153 370 371 407`
      },
      {
        "Input": `4154
        1
        99999`,
        "Output": `false
        1 4150 4151 54748 92727 93084`
      }
    ]
  },{
    "Challenge Name": "Pep_Java_3DataTypeAndBitManipulation_2NumberOfTimesADigitOccur",
    "Description": "Number Of Times A Digit Occur",
    "Problem Statement": `Count the number of d's as digit in a number.

    Take as input
    1. A Number: N
    2. Digit: d
    
    let us assume 'res' is desired answer.
    
    Example
    Input :
    66666666
    6
    Output :
    8
    Explanation: Total 6s that appear as digit
                 in 66666666 is 8 times.`,
    "Input Format": `Integer representing d
    Integer representing N`,
    "Constraints": `0 <= d <= 9
    1 <= N <= 10^18`,
    "Output Format": `res`,
    "Tags": "Basics",
    "Testcases": [
      {
        "Input": `133535353
                    3`,
        "Output": `5`
      },
      {
        "Input": `08987878798878
        3`,
        "Output": `0`
      }
    ]
    
  }
]
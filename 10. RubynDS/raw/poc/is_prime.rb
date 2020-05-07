# Dynamically Typed , ;,()=> optional, ,interpreted language cross platform  
# puts "Hello Ruby"
# no variable declaration=> naming convention
# truely Object Oriented Language=> everything is a object
def is_prime (num)
  div=2
  while (div*div<=num)
    # block level ending 
    if (num%div==0)
      return false;
      
    end
    # no increment or decrement operator
    div+=1
  end
  return true
end
a =is_prime (11)
# puts a.class
# implict type conversion=> explicit
# puts " Number 11 is? "+a.to_s()
def print_all_primes(num)
# for(let i=2;i<=num;i++)
  # for i in (num).downto(2)
  # range operator
  for i in (2..num-1)
    is_status=is_prime(i)
  if(is_status)
    puts i
  end
  end
end
print_all_primes(10)

# print fib


puts num.class

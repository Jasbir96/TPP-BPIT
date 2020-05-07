#  using gets.chomp input comes in form of string
m =gets.chomp.to_i;
n =gets.chomp.to_i;
arr=[]
for i in (0..m-1)
  row=[]
  for j in (0..n-1)
    val=gets.chomp.to_i
    row.push(val)
  end
  arr.push(row)
end
puts "**************************************"
def display(arr)
  for i in (0..arr.length-1)
  print(arr[i])
  puts
  end
end
display(arr)
# System.out.println=>puts
# System.out.print=>print



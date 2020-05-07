arr=[2,5,3,7,1]
max=arr.max();
for floor in (max).downto(1)
  for i in (0..arr.length-1)
    if(floor>arr[i])
      print " \t"
    else
      print"* \t"
    end
  end
  puts 
end
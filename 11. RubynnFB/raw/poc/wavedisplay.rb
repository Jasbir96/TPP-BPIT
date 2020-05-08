# process => node 
m =ARGV[0].to_i;
n =ARGV[1].to_i;
ARGV.clear();
#  argv => to execute the ruby => pass arguments=> buffer 
# ruby => input start => buffer 
arr=[]
for i in (0..m-1)
  row=[]
  for j in (0..n-1)
    # code execute 
    val=gets.chomp.to_i
    row.push(val)
  end
  arr.push(row)
end
puts "*********************************"
def wave_display(arr)
  for j in (0..arr[0].length-1)
    if(j%2==0)
      # normal loop 
      for i in (0..arr.length-1)
        print(arr[i][j].to_s+" ")
      end
    else
      for i in (arr.length-1).downto(0)
        print (arr[i][j].to_s+ " ")
      end
      # reverse loop
    end
  end
  puts
  puts "**************************************"
end
wave_display(arr);
# spiral display




# 4
# 4
# 11
# 12
# 13
# 14
# 21
# 22
# 23
# 24
# 31
# 32
# 33
# 34
# 41
# 42
# 43
# 44
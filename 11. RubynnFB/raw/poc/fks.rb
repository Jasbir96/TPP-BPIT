class Item
  attr_accessor :val ,:wt,:ratio
  def initialize(val,wt)
    @val =val;
    @wt=wt;
    @ratio=val.to_f/wt;
  end
  def to_s
    return "#{val.to_s} - #{wt.to_s}"
  end
  #  2 item pass => @=>10,20|other =>5,30 
  # node<=>other
  # node=> +1
  # other=>  -1
  # node=other=0
  def <=>(other)
        if(@ratio>other.ratio)
          return -1
        elsif (other.ratio>@ratio)
        return +1
        else
          return 0
        end
end
end
prices=[15,14,10,45,30]
wts=[2,5,1,3,4]
items=[]
# operator overloading => operator overloading 
for i in (0..prices.length-1)
   single_item=Item.new(prices[i],wts[i])
   items.push(single_item)
end
# for i in (0..prices.length-1)
#   puts items[i]
# end
 items.sort()
# for i in (0..prices.length-1)
#   puts ratio_arr[i]
# end
vib=0
rc=7
idx=0
while(idx<items.length)
  if(rc>items[idx].wt)
    vib=vib+items[idx].val
    rc=rc-items[idx].wt
  else
    vib=vib+rc*items[idx].ratio
    rc=0
    break
  end
end
puts vib
# puts => console print logic => what to print => to string 
# sort => logic => how to sort => how to compare => <=>

class Edge
  attr_accessor :vtx,:wt
  #  constructor
  def initialize(vtx,wt)
      @vtx=vtx
      @wt=wt
  end
  def to_s
    return @vtx.to_s+" @ "+wt.to_s
  end
end
# negative=> min priority queue


graph=[]
# lhs=> represents vertex
# rhs => neighbour , and cost to reach there
graph[0]=[Edge.new(1,10),Edge.new(3,40)]
graph[1]=[Edge.new(0,10),Edge.new(2,10)]
graph[2]=[Edge.new(1,10),Edge.new(3,10)]
graph[3]=[Edge.new(0,40),Edge.new(4,2),Edge.new(2,10)]
graph[4]=[Edge.new(3,2),Edge.new(6,5),Edge.new(5,3)]
graph[5]=[Edge.new(4,3),Edge.new(6,3)]
graph[6]=[Edge.new(5,3),Edge.new(4,5)]
require 'algorithms'
include Containers
class Dpair
  attr_accessor :vtx,:psf,:csf
  def initialize(vtx,psf,csf)
    @vtx=vtx
    @psf=psf
    @csf=csf
  end
  def to_s
    return "#{@vtx.to_s} - #{@psf.to_s} - #{@csf.to_s}"
  end
end
# dijakstra
def dijakstra(graph,srcvtx)
  pq=PriorityQueue.new()
  #  push th source node
  pq.push(Dpair.new(srcvtx,srcvtx.to_s,0),0)
  # to mark => hash
  hash={}
  # run till pq is empty
  while pq.size()>0
    #  pop=> highest priority
    rem=pq.pop()
    # unmarked=> mark
    if(hash.key?(rem.vtx))
      next #continue
    end
    # mark yourself
    hash[rem.vtx]=true
        # print
    puts  rem  
        # unmarked neighbours add
    for ei in (0..graph[rem.vtx].length-1)
      edge=graph[rem.vtx][ei]
      if(hash.key?(edge.vtx)==false)
        pq.push(Dpair.new(edge.vtx,rem.psf+edge.vtx.to_s,rem.csf+edge.wt),-(rem.csf+edge.wt))
      end
    end
  end
end
dijakstra(graph,0)

# display
def display(graph)
  for vtx in (0..graph.length-1)
  print vtx.to_s+" -> "
    for ei in (0..graph[vtx].length-1)
      print graph[vtx][ei].to_s+  " , "
    end
    puts 
  end
end
# display (graph);

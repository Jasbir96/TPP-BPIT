# Promises Basics
  * Promise => assurance of a work that could be completed in future
  * Promise could either resolved or rejected once in a life time 
  * Promise => states 
                    1. Initial:  Pending [*]
                    2.  Final => resolved ,reject[*]  
                        if you call resolve => final => promise will resolve with value passed in resolve fn[*]
                        if you call reject => final => promise will reject with value passed in reject  fn[*]
  * To consume a promise we have two **Synchronous functions** then/catch .They are used to register cb fxn to that promise 
  * cb of any promise will only execute when promise recieved from it get into it's final state
  * cb fn passed through then and catch are async
  * then and catch also returns  a promise
  * final state of  promise returned from  then/catch depends upon value returned from there cb =>scb,fcb
            if cb returns then your promise will resolve into
                        val=>val
                        nothing=> undefined
                        promise=> promise
                        err
                          fcb => will call fcb and err as it's message 
                          err=> propogate 
  * then have two cb => scb ,fcb, fcb => optional
  * catch => catch(fcb)=> then(undefined,fcb)

  <!-- I will create my own Promise-->
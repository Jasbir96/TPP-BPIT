require "selenium-webdriver"
# modules => include => need not to on every command 
require "json"
include  Selenium::WebDriver
options =Chrome::Options.new()
options.add_argument('--start-maximized')
options.add_argument('--disable-notifications')
# # wait 
cFile=ARGV[0]
pUrl=ARGV[1]
numofPosts=ARGV[2].chomp.to_i
puts pUrl
driver = Selenium::WebDriver.for :chrome, options: options
wait = Selenium::WebDriver::Wait.new(timeout: 10)
driver.manage.timeouts.implicit_wait = 5
driver.get( "https://facebook.com")
# read json file
file =File.read(cFile)
creds = JSON.parse(file)[1];
pwd=creds["pwd"]
user=creds["user"]
# synchronous 
# wait 
#  find 
email=driver.find_element(css: "input[type=email]")
# action
email.send_keys(user)
# password
#  find 
password=driver.find_element(css: "input[type=password]")
# action
password.send_keys(pwd)
#  find 
submit=driver.find_element(css: ".login_form_login_button")
# action
# home Page*******************************
#  find 
# action
submit.click()
searchBox=driver.find_element(:css,"._1frb");
searchBox.send_keys("The Hindu");
# searchBox.send_keys(:arrowdown)
searchBox.send_keys(:enter)
# *****************click
wait.until { driver.find_element(:css,"li[data-edge=keywords_pages] a") }
pages_tab=driver.find_element(:css,"li[data-edge=keywords_pages] a");
pages_tab.click();
wait.until { driver.find_element(:css,"._1glk._6phc.img") }
pages_img=driver.find_element(:css,"._1glk._6phc.img");
pages_img.click();
wait.until { driver.find_element(:css,"div[data-key=tab_posts]") }
pages_post=driver.find_element(:css,"div[data-key=tab_posts]");
pages_post.click();

idx=0
while(idx<numofPosts)
  driver.find_element(css:"#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager")
  elements=driver.find_elements(css:"#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8")
  post=elements[idx]
  # wait.until { driver.find_element(:css,"._666k") }
# like=post.find_element(css:"._666k")
# like.click()
puts idx
if(idx==elements.length)
  driver.execute_script("window.scrollTo(0,document.body.clientHeight)")
  # static wait 
  sleep 2
end
  idx+=1
end
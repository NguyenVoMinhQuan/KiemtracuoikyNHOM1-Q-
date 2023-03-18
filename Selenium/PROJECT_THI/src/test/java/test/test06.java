package test;

import driver.driverFactory;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.AssertJUnit;
import org.testng.annotations.Test;

import java.io.File;

/* Verify user is able to purchase product using registered email id(USE CHROME BROWSER)
Test Steps:
1. Go to http://live.techpanda.org/
2. Click on my account link
3. Login in application using previously created credential
4. Click on MY WISHLIST link
5. In next page, Click ADD TO CART link
6. Enter general shipping country, state/province and zip for the shipping cost estimate
7. Click Estimate
8. Verify Shipping cost generated
9. Select Shipping Cost, Update Total
10. Verify shipping cost is added to total
11. Click "Proceed to Checkout"
12a. Enter Billing Information, and click Continue
12b. Enter Shipping Information, and click Continue
13. In Shipping Method, Click Continue
14. In Payment Information select 'Check/Money Order' radio button. Click Continue
15. Click 'PLACE ORDER' button
16. Verify Oder is generated. Note the order number

NOTE: PROCEED TO CHECKOUT (step 6 ) was taken out, so as to allow the Estimate button step to get processed.
Rest of the steps renumbered accordingly.
*/
public class test06 {
    @Test
    public static void  test06(){
        int scc = 0 ;

        StringBuffer verificationErrors = new StringBuffer();
//Init web-driver
        WebDriver driver = driverFactory.getChromeDriver();

        try{
            //Step 1. Go to http://live.techpanda.org/
            driver.get("http://live.techpanda.org/");
            //Step 2. Click on my account link
            driver.findElement(By.cssSelector("a[class='skip-link skip-account'] span[class='label']")).click();
            //debug
//            Thread.sleep(500);
            //Step 3. login
            driver.findElement(By.cssSelector("a[title='Log In']")).click();
            //điền vào form
            driver.findElement(By.cssSelector("#email")).sendKeys("minhquan@gmail.com");
            driver.findElement(By.cssSelector("#pass")).sendKeys("123456");

            //step4. Click login
            driver.findElement(By.id("send2")).click();

                        Thread.sleep(2000);

            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > header:nth-child(2) > div:nth-child(1) > div:nth-child(4) > nav:nth-child(1) > ol:nth-child(1) > li:nth-child(2) > a:nth-child(1)")).click();
            //7.Add product in your wish list - use product - LG LCD
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(2) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)")).click();
            driver.findElement(By.xpath("//span[@class='label'][normalize-space()='Account']")).click();

            //Step 5. click on my wish list
            driver.findElement(By.xpath("//a[contains(text(), 'My Wishlist')]")).click();
            Thread.sleep(2000);

            //click add to caft
            driver.findElement(By.cssSelector("button[title='Add to Cart']")).click();

            //state
            driver.findElement(By.id("country")).sendKeys("Viet Nam");
            driver.findElement(By.cssSelector("#region")).sendKeys("Ho Chi Minh");
            driver.findElement(By.cssSelector("#postcode")).sendKeys("700000");
            Thread.sleep(2000);
            // click entimate
            driver.findElement(By.cssSelector("button[title='Estimate'] span span")).click();
            //verify shipping cost
            driver.findElement(By.cssSelector("label[for='s_method_flatrate_flatrate']")).getText();
            driver.findElement(By.cssSelector("#s_method_flatrate_flatrate")).click();
            driver.findElement(By.cssSelector("button[title='Update Total'] span span")).click();
            Thread.sleep(2000);
            //verify the total
            driver.findElement(By.cssSelector("strong span[class='price']")).getText();
            //click Proceed check out
            driver.findElement(By.cssSelector("li[class='method-checkout-cart-methods-onepage-bottom'] button[title='Proceed to Checkout']")).click();
            //
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > ol:nth-child(5) > li:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)")).sendKeys("ITC");
            driver.findElement(By.xpath("//input[@id='billing:street1']")).sendKeys("Trinh Dinh Thao , HCM city");
            driver.findElement(By.xpath("//input[@id='billing:street2']")).sendKeys("835");
            driver.findElement(By.xpath("//input[@id='billing:city']")).sendKeys("Ho Chi Minh");
            driver.findElement(By.xpath("//select[@id='billing:country_id']")).sendKeys("Viet Nam");
            driver.findElement(By.xpath("//input[@id='billing:region']")).sendKeys("Thanh Pho Ho Chi Minh ");
            Thread.sleep(2000);
            driver.findElement(By.xpath("//input[@id='billing:postcode']")).sendKeys("700000");
            driver.findElement(By.xpath("//input[@id='billing:telephone']")).sendKeys("0121365696");
            driver.findElement(By.xpath("//input[@id='billing:fax']")).sendKeys("841257565");
            driver.findElement(By.xpath("//input[@id='billing:use_for_shipping_yes']")).click();
            Thread.sleep(2000);
            //continue

            driver.findElement(By.xpath("//input[@id='billing:use_for_shipping_yes']")).click();
//
            //ship ment con
            driver.findElement(By.xpath("//button[@onclick='shippingMethod.save()']")).click();
            Thread.sleep(2000);

//            check order
            driver.findElement(By.xpath("//input[@id='p_method_checkmo']")).click();
            //payment save
            driver.findElement(By.xpath("//button[@onclick='payment.save()']")).click();
            Thread.sleep(2000);
            //pay
            driver.findElement(By.xpath("//button[@title='Place Order']")).click();
            //note order num
            driver.findElement(By.xpath("//button[@title='Place Order']")).getText();
        }catch(Exception e){
            e.printStackTrace();
        }
        //end
        driver.quit();


    }
}

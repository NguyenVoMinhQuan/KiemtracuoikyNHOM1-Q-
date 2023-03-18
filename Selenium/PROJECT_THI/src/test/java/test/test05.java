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

/* Verify can create an account in e-Commerce site and can share wishlist to other poeple using email.
Test Steps:
1. Go to http://live.techpanda.org/
2. Click on my account link
3. Click Create an Account link and fill New User information except Email ID
4. Click Register
5. Verify Registration is done. Expected account registration done.
6. Go to TV menu
7. Add product in your wish list - use product - LG LCD
8. Click SHARE WISHLIST
9. In next page enter Email and a message and click SHARE WISHLIST
10.Check wishlist is shared. Expected wishlist shared successfully.
*/
public class test05 {
    @Test
    public static void  test05(){
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
            //Step 3. Click Create an Account link and fill New User information except Email ID
          driver.findElement(By.cssSelector("a[title='Register']")).click();
          //điền vào form
            driver.findElement(By.cssSelector("#firstname")).sendKeys("Quân");
            driver.findElement(By.cssSelector("#middlename")).sendKeys("Minh");
            driver.findElement(By.cssSelector("#lastname")).sendKeys("Nguyễn Võ ");
            driver.findElement(By.cssSelector("#email_address")).sendKeys("abc@gmail.com");
            driver.findElement(By.cssSelector("#password")).sendKeys("0123456");
            driver.findElement(By.cssSelector("#confirmation")).sendKeys("0123456");
            //step4. Click Register
            driver.findElement(By.cssSelector("button[title='Register'] span span")).click();

            //Step 5. Verify Registration is done. Expected account registration done.


            if( driver.findElement(By.cssSelector(".success-msg span")).getText().contains("Thank you for registering with Main Website Store.")) {
                System.out.println("Account registration done.");
            } else {
                System.out.println("Account registration failed.");
            }

            //6. Go to TV menu
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > header:nth-child(2) > div:nth-child(1) > div:nth-child(4) > nav:nth-child(1) > ol:nth-child(1) > li:nth-child(2) > a:nth-child(1)")).click();
            //7.Add product in your wish list - use product - LG LCD
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(2) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)")).click();
            //8. Click SHARE WISHLIST
            driver.findElement(By.cssSelector("button[title='Share Wishlist'] span span")).click();
            //9
            driver.findElement(By.cssSelector("#email_address")).sendKeys("abc@gmail.com");
            driver.findElement(By.cssSelector("#message")).sendKeys("test");

            driver.findElement(By.cssSelector("button[title='Share Wishlist'] span span")).click();
            //10
            scc = (scc +1 );
            File scrFile =((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
            String png =("D:\\ITC\\HTKTUD\\lap\\img\\TC5"+ scc +".png");
            FileUtils.copyFile(scrFile, new File(png));
        }catch(Exception e){
            e.printStackTrace();
        }
        //end
        driver.quit();


    }
}

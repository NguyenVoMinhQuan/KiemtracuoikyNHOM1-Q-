package test;

import driver.driverFactory;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.AssertJUnit;
import org.testng.annotations.Test;

import java.io.File;
import java.time.Duration;

/*
Test Steps:
1. Go to http://live.techpanda.org/
2. Click on �MOBILE� menu
3. In mobile products list , click on �Add To Compare� for 2 mobiles (Sony Xperia & Iphone)
4. Click on �COMPARE� button. A popup window opens
5. Verify the pop-up window and check that the products are reflected in it
Heading "COMPARE PRODUCTS" with selected products in it.
6. Close the Popup Windows
*/
public class test4 {
    @Test
    public static void  test04(){
        int scc = 0 ;

        StringBuffer verificationErrors = new StringBuffer();
//Init web-driver
        WebDriver driver = driverFactory.getChromeDriver();

        try{
            //Step 1. Go to http://live.techpanda.org/
            driver.get("http://live.techpanda.org/");
            //Click on �MOBILE� menu
            driver.findElement(By.linkText("MOBILE")).click();
       //3. In mobile products list , click on �Add To Compare� for 2 mobiles (Sony Xperia & Iphone)
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(2) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(2)")).click();
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(2) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(2)")).click();


         //   4. Click on �COMPARE� button. A popup window opens
            driver.findElement(By.cssSelector("button[title='Compare'] span span")).click();
            //debug
            //5. Verify the pop-up window and check that the products are reflected in it

            //6.  Close the Popup Windows
            scc = (scc +1 );
            File scrFile =((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
            String png =("D:\\ITC\\HTKTUD\\lap\\img\\TC04"+ scc +".png");
            FileUtils.copyFile(scrFile, new File(png));

        }catch(Exception e){
            e.printStackTrace();
        }
        //end
        driver.quit();


    }
}

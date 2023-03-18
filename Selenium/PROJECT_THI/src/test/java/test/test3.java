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
1. Goto http://live.techpanda.org/
2. Click on �MOBILE� menu
3. In the list of all mobile , click on �ADD TO CART� for Sony Xperia mobile
4. Change �QTY� value to 1000 and click �UPDATE� button. Expected that an error is displayed
"The requested quantity for "Sony Xperia" is not available.
5. Verify the error message
6. Then click on �EMPTY CART� link in the footer of list of all mobiles. A message "SHOPPING CART IS EMPTY" is shown.
7. Verify cart is empty

 */
public class test3 {
    @Test
    public static void  test03(){
        int scc = 0 ;

        StringBuffer verificationErrors = new StringBuffer();
//Init web-driver
        WebDriver driver = driverFactory.getChromeDriver();

        try{
            //Step 1. Go to http://live.techpanda.org/
            driver.get("http://live.techpanda.org/");
            //Click on �MOBILE� menu
            driver.findElement(By.linkText("MOBILE")).click();
            //3. In the list of all mobile , click on �ADD TO CART� for Sony Xperia mobile
            driver.findElement(By.cssSelector("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(2) > div:nth-child(4) > button:nth-child(1) > span:nth-child(1) > span:nth-child(1)"));

            //debug
            //   Thread.sleep(500);
            //4. Change �QTY� value to 1000 and click �UPDATE� button. Expected that an error is displayed
            //"The requested quantity for "Sony Xperia" is not available.
            //Find form in
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
            WebElement qtyElem = wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.cssSelector("input[title='Qty']"))));
            //put
            qtyElem.sendKeys("1000");
            WebElement btnItem = driver.findElement(By.cssSelector("button[title='Update'] span span"));
            btnItem.click();
            //5. Verify the error message
            String arlert = driver.findElement(By.cssSelector(".item-msg.error")).getText();
            System.out.println(arlert);
            try {
                AssertJUnit.assertEquals("arlert for ",arlert);
            }catch (Error e){
                verificationErrors.append(e.toString());
            }

            //6. Then click on �EMPTY CART� link in the footer of list of all mobiles. A message "SHOPPING CART IS EMPTY" is shown.
            driver.findElement(By.cssSelector("td[class='a-center product-cart-remove last'] a[title='Remove Item']")).click();
            //debug
            //7. Verify cart is empty
            scc = (scc +1 );
            File scrFile =((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
            String png =("D:\\ITC\\HTKTUD\\lap\\img\\TC03"+ scc +".png");
            FileUtils.copyFile(scrFile, new File(png));

        }catch(Exception e){
            e.printStackTrace();
        }
        //end
        driver.quit();


    }
}

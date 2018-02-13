-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema shopping
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shopping
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shopping` DEFAULT CHARACTER SET utf8 ;
USE `shopping` ;

-- -----------------------------------------------------
-- Table `shopping`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `shopping`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`customers` (
  `teudat_zehut` INT(11) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `e_mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(15) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `role` VARCHAR(8) CHARACTER SET 'big5' NOT NULL,
  PRIMARY KEY (`teudat_zehut`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `shopping`.`shopping_carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`shopping_carts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer` INT(11) NOT NULL,
  `creation_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `shopping_cart_customer_idx` (`customer` ASC),
  CONSTRAINT `shopping_cart_customer`
    FOREIGN KEY (`customer`)
    REFERENCES `shopping`.`customers` (`teudat_zehut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `shopping`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer` INT(11) NOT NULL,
  `shopping_cart` INT(11) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `delivery_town` VARCHAR(45) NOT NULL,
  `delivery_street` VARCHAR(45) NOT NULL,
  `delivery_date` DATE NOT NULL,
  `order_date` DATE NOT NULL,
  `credit_card_info` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `order_customer_idx` (`customer` ASC),
  INDEX `order_shopping_cart_idx` (`shopping_cart` ASC),
  CONSTRAINT `order_customer`
    FOREIGN KEY (`customer`)
    REFERENCES `shopping`.`customers` (`teudat_zehut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_shopping_cart`
    FOREIGN KEY (`shopping_cart`)
    REFERENCES `shopping`.`shopping_carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `shopping`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category` INT(11) NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_category_idx` (`category` ASC),
  CONSTRAINT `product_category`
    FOREIGN KEY (`category`)
    REFERENCES `shopping`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `shopping`.`shopping_cart_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shopping`.`shopping_cart_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product` INT(11) NOT NULL,
  `quantity` SMALLINT(6) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `shopping_cart` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `shopping_cart_item_product_idx` (`product` ASC),
  INDEX `shopping_cart_item_shopping_cart_idx` (`shopping_cart` ASC),
  CONSTRAINT `shopping_cart_item_product`
    FOREIGN KEY (`product`)
    REFERENCES `shopping`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shopping_cart_item_shopping_cart`
    FOREIGN KEY (`shopping_cart`)
    REFERENCES `shopping`.`shopping_carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `shopping` ;

-- -----------------------------------------------------
-- procedure get_categories_for_ddl
-- -----------------------------------------------------

DELIMITER $$
USE `shopping`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_categories_for_ddl`()
BEGIN

		SELECT 	id as value,
				name  as text 
		FROM    categories
        order by name;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_products
-- -----------------------------------------------------

DELIMITER $$
USE `shopping`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_products`()
BEGIN

		SELECT 	id,
				name,
                category,
                price
		FROM    products
        order by name;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_product
-- -----------------------------------------------------

DELIMITER $$
USE `shopping`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_product`(IN name VARCHAR(45),
															 IN category int,
                                                             in price decimal(6,2))
BEGIN

	DECLARE new_product_id int;

    INSERT INTO products
    (`name`, category, price) 
    VALUES 
    (name, category, price);    
    
    SELECT LAST_INSERT_ID()
    INTO new_product_id;
    SELECT new_product_id;
    
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


insert into categories (name) values ("Milk & Eggs");
insert into categories (name) values ("Vegetables & Fruits");
insert into categories (name) values ("Meat & Fish");
insert into categories (name) values ("Wine & Drinks");

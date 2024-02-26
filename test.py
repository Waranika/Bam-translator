import cv2
import pytesseract

# Path to Tesseract executable (change it according to your system)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Read the image
image = cv2.imread('test.png')

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Use a threshold to make the image binary
_, binary_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

# Perform OCR using Tesseract
text = pytesseract.image_to_string(binary_image, lang='grc')

# Print the extracted text
print("Extracted Greek Alphabet:")
print(text)

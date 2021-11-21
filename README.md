# AmazonPriceTracker
A Price Tracker for Amazon and much more

## Todo
* [x] Think about the data minimation if only save the prev data and if needed the change data
* [x] Think of a way to prevent sedning if delivery day changes due to day switch
    * [x] When the delivery switches then the current day switches or the actual delivery is delayed
* [ ] Add Routes to get the data for a Product for maybe a Chart
* [x] Think in general of authentication
* [x] Data minimalization as described under
* [ ] Think in general of authorization
* [ ] Authentication
    * [ ] Implement the new table accounts schema 
    * [ ] Email Adress
    * [ ] bind products
* [ ] Maybe bring this to public

### Idea on data minimalization
Only save new data if something changed so dont save every hour the data! instead only save the data if something really changed

### Mathematical Estimation
in 1 year: n(procuts) * 24*365\
n = 100: 876k\
n = 400: 3.5 Million
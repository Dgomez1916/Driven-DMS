# CarCar

Team:

* Danny Gomez - Sales Microservice
* Boris Veits - Services Microservice
## Design
Bootstrap utilized for base design
## Service microservice
Models:
 Technician - Got the required fields.
Appointment - With required fieds. Status field with three option and VIP as boolean. Also, technician field will be related to Technician model.
AutomobileVO - sold and vin fields, and import_href as well.  The integration is through the poller which sends the api request to inventory api to get all the information about automobiles. In my case I had yo pull the vin information to check if the vehicle is in VIP status.


## Sales microservice
Models created and utilized are:
AutomobileVO
Salesperson
Customer
Sale

These models were used to intergrate with both the Inventory and Service microservice pieces of the application.

The Sale model is an integral part of the 'Appointment' portion of our application, it allows the Service Dev to setup a 'vip' setting, which allows the employee to give preferred service times to customers that have purchased the vehicle from Car-Car.


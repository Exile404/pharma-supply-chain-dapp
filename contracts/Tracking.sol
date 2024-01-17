// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tracking {
    enum DeliveryStatus { PENDING, IN_TRANSIT, SOLD}

    struct Order {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        DeliveryStatus status;
        bool isSold;
    }
    mapping (address => Order[]) public orders;
    uint256 public ordersCount;

    struct TypeOrder{
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        DeliveryStatus status;
        bool isSold;
    }
    TypeOrder[] typeorders;

    event OrderCreated(address indexed sender, address indexed receiver, uint256 pickupTime,
    uint256 distance, uint256 price);
    event OrderInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event OrderDelivered(address indexed sender, address indexed receiver, uint256 pickupTime);
    event OrderPaid(address indexed sender, address indexed receiver, uint256 amount);

    constructor(){

        ordersCount = 0;
    }

    function createOrder(address _receiver, uint256 _pickupTIme, uint256 _distance, uint256 _price) public payable{
        require(msg.value == _price, "Payment amount must match the price.");

        Order memory order = Order(msg.sender, _receiver, _pickupTIme, 0, _distance, _price, DeliveryStatus.PENDING, false);
        orders[msg.sender].push(order);
        ordersCount++;
        typeorders.push(
            TypeOrder(
                msg.sender,
                _receiver,
                _pickupTIme,
                0,
                _distance,
                _price,
                DeliveryStatus.PENDING,
                false
            )
        );
        emit OrderCreated(msg.sender,_receiver,_pickupTIme, _distance, _price);
    }
    function startOrder(address _sender, address _receiver, uint256 _index) public{
        Order storage order = orders[_sender][_index];
        TypeOrder storage typeorder = typeorders[_index];
        
        require(order.receiver == _receiver, "Invalid Receiver.");
        require(order.status == DeliveryStatus.PENDING, "Medicine already on the way.");
        order.status = DeliveryStatus.IN_TRANSIT;
        typeorder.status = DeliveryStatus.IN_TRANSIT;
        emit OrderInTransit(_sender, _receiver, order.pickupTime);
    }
    function completeOrder(address _sender, address _receiver, uint256 _index)
    public{
        Order storage order = orders[_sender][_index];
        TypeOrder storage typeorder = typeorders[_index];
        require(order.receiver == _receiver,"Invalid receiver");
        require(order.status == DeliveryStatus.PENDING, "Medicine not in transit.");
        require(!order.isSold,"Medicine already sold");
        order.status = DeliveryStatus.SOLD;
        order.deliveryTime = block.timestamp;
        typeorder.status = DeliveryStatus.SOLD;
        typeorder.deliveryTime = block.timestamp;
        uint256 amount = order.price;
        payable(order.sender).transfer(amount);
        order.isSold = true;
        typeorder.isSold = true;
        emit OrderDelivered(_sender, _receiver, order.deliveryTime);
        emit OrderPaid(_sender, _receiver, amount);
    }
    
    // Another function might be added here


    function getOrder(address _sender, uint256 _index) 
                public view returns(address, address, uint256, uint256, uint256, uint256, DeliveryStatus, bool) {
                    Order memory order = orders[_sender][_index];
                    return(order.sender, order.receiver, order.pickupTime, order.deliveryTime, 
                    order.distance, order.price, order.status, order.isSold);
    }

    function getOrdersCount(address _sender) public view returns(uint256){
        return orders[_sender].length;
    }

    function getAllTransactions()
        public view returns(TypeOrder[] memory){
            return typeorders;
        }


}
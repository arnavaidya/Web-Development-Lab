$(document).ready(function() {
  // Load external pages
  $("#menu").load("menu.html");
  $("#about").load("about.html");
  $("#contact").load("contact.html");
  
  // Initialize pages after loading
  $(document).on("pagecontainerbeforeshow", function() {
    $.mobile.pageContainer.trigger("create");
  });
  
  // Handle order form submission
  $(document).on("submit", "#orderForm", function(event) {
    event.preventDefault();
    
    // Get form data
    var formData = {
      name: $("#name").val(),
      phone: $("#phone").val(),
      address: $("#address").val(),
      orderType: $("#orderType").val(),
      orderDetails: $("#orderDetails").val(),
      specialInstructions: $("#specialInstructions").val()
    };
    
    // For demonstration - log the form data
    console.log("Order submitted:", formData);
    
    // Here you would normally send the data to a server
    // $.ajax({ ... });
    
    // Show confirmation message
    var message = "Thank you for your order, " + formData.name + "!\n";
    message += "We've received your " + formData.orderType + " order and will prepare it right away.\n";
    message += "We'll call you at " + formData.phone + " when it's ready.";
    
    alert(message);
    
    // Reset form
    this.reset();
  });
  
  // Add active class to current navbar item
  $(document).on("pageshow", "[data-role='page']", function() {
    var currentPage = $(this).attr("id");
    $("[data-role='navbar'] a").removeClass("ui-btn-active");
    $("[data-role='navbar'] a[href='#" + currentPage + "']").addClass("ui-btn-active");
  });
  
  // Handle dynamic pricing calculation for a potential future feature
  function calculateTotal() {
    // This would calculate the total price based on selections
    // For now it's just a placeholder
    console.log("Calculating total...");
  }
});
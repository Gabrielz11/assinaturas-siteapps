var build_customer = function() {
    var customer_params = {
        fullname: $("#fullname").val(),
        email: $("#email").val(),
        code: slugify($("#fullname").val().toLowerCase()),
        fullname : $("#fullname").val(),
        cpf : $("#cpf").val(),
        birthdate_day : $("#birthdate_day").val(),
        birthdate_month: $("#birthdate_month").val(),
        birthdate_year: $("#birthdate_year").val(),
        phone_area_code: $("#ddd").val(),
        phone_number: $("#phone").val(),
        billing_info: build_billing_info(),
        address: build_address()
    }
  return new Customer(customer_params);
};

var build_billing_info = function() {
  var billing_info_params = {
      fullname : $("#holder_name").val(),
      expiration_month: $("#expiration_month").val(),
      expiration_year: $("#expiration_year").val(),
      credit_card_number: $("#credit_card").val()
  };
  return new BillingInfo(billing_info_params);
};

var build_address = function() {
  var address_params = {
      street: $("#rua").val(),
      number: $("#numero").val(),
      complement: $("#complemento").val(),
      district: $("#bairro").val(),
      zipcode: $("#cep").val(),
      city: $("#cidade").val(),
      state: $("#estado").val(),
      country: "BRA"
  };
  return new Address(address_params);
};

var slugify = function(text) {
    text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
    text = text.replace(/-/gi, "_");
    text = text.replace(/\s/gi, "-");
    return text;
}
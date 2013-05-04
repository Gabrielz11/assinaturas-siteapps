$(document).ready(function(){
  $.getScript("https://sandbox.moip.com.br/moip-assinaturas.min.js");
  $.getScript("http://brenooliveira.github.io/assinaturas-siteapps-demo/js/jquery.simplemodal.js");
  $.getScript("http://brenooliveira.github.io/assinaturas-siteapps-demo/js/jquery.simplemodal.js");
  $('head').append('<link rel="stylesheet" href="http://brenooliveira.github.io/assinaturas-siteapps-demo/css/siteapps.css" type="text/css" />');
  $('head').append('<link rel="stylesheet" href="http://brenooliveira.github.io/assinaturas-siteapps-demo/css/basic.css"  type="text/css" />');

  var assinaturas = document.createElement("div");
  $(assinaturas).attr("class", "assinaturas");

  var container = document.createElement("div");
  $(container).attr("class", "assinaturas-container");

  var alert = document.createElement("div");
  $(alert).attr("class", "assinaturas-error");
  $(alert).hide();
  $(alert).append("<p>Corrija os seguintes campos: </p>");

  $(container).append(alert);

  buildForm(container);

  var criar_assinatura = document.createElement("button");
  $(criar_assinatura).text("Assinar");
  $(criar_assinatura).attr("id","criar-assinatura");

  $(container).append(criar_assinatura);

  $(assinaturas).append(container);

  var assinar = document.createElement("img");
  $(assinar).attr("src", "http://empregonamira.com.br/assets/button.png");
  $(assinar).attr("class", "assinaturas-assinar");
  $(assinar).click(function() {
    $(".assinaturas-container").modal();
  });

  $(assinaturas).append(assinar);

  $(criar_assinatura).click(function(){
    console.log("TESTE ....");
    var moip = new MoipAssinaturas("[%token%]");
    var customer = build_customer();
    var subscription_code = new Date().getTime();

    moip.subscribe(
        new Subscription()
            .with_code(subscription_code)
            .with_new_customer(customer)
            .with_plan_code("[%plan_code%]")
    ).callback(function(response){
        if (!response.has_errors()) {
            alert("Assinado");
        } else {
          console.log(response);
          $(".assinaturas-error").empty();
          for (i = 0; i < response.errors.length; i++) {
            var erro = response.errors[i].description;
            $(".assinaturas-error").append("<p>" + erro + "</p>");
            $(".assinaturas-error").fadeIn();
          }
        }
    });
  });

  $("#[%tag%]").append(assinaturas);

});


function createField(id, label) {
  var labelForm = document.createElement("label");
  $(labelForm).text(label);

  var el = document.createElement("input");
  $(el).attr("id", id);

  $(labelForm).append(el);
  return labelForm;
};

function buildForm(assinaturas) {
  $(assinaturas).append(createField("fullname", "Nome: "));
  $(assinaturas).append(createField("email", "E-mail: "));
  $(assinaturas).append(createField("cpf", "CPF: "));
  $(assinaturas).append(createField("birthdate_day", "Nascimento: "));
  $(assinaturas).append(createField("birthdate_month", "Nascimento: "));
  $(assinaturas).append(createField("birthdate_year", "Nascimento: "));
  $(assinaturas).append(createField("ddd", "DDD: "));
  $(assinaturas).append(createField("phone", "Telefone: "));
  $(assinaturas).append(createField("rua", "Rua: "));
  $(assinaturas).append(createField("numero", "Número: "));
  $(assinaturas).append(createField("bairro", "Bairro: "));
  $(assinaturas).append(createField("cep", "CEP: "));
  $(assinaturas).append(createField("cidade", "Cidade: "));
  $(assinaturas).append(createField("estado", "Estado: "));
  $(assinaturas).append(createField("holder_name", "Nome no cartão: "));
  $(assinaturas).append(createField("expiration_month", "Expiracao mes: "));
  $(assinaturas).append(createField("expiration_year", "Expiracao ano: "));
  $(assinaturas).append(createField("credit_card", "Cartão: "));
}

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
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
    var moip = new MoipAssinaturas("[%token%]");
    var customer = build_customer();
    var subscription_code = new Date().getTime();

    moip.subscribe(
        new Subscription()
            .with_code(subscription_code)
            .with_new_customer(customer)
            .with_plan_code("[%plan_code%]")
    ).callback(function(response){
        if (response.has_errors()) {
          $(".assinaturas-error").empty();
          for (i = 0; i < response.errors.length; i++) {
            var erro = response.errors[i].description;
            $(".assinaturas-error").append("<p>" + erro + "</p>");
            $(".assinaturas-error").fadeIn();
          }
        } else {
          $(".formulario").empty();
          $(".formulario").append("<h1>Assinatura criada com sucesso.</h1>");
        }
    });
  });

  $("#[%tag%]").append(assinaturas);

});


function createField(id, label) {
  var labelForm = document.createElement("label");
  $(labelForm).text(label);
  $(labelForm).append("<br>");
  var el = document.createElement("input");
  $(el).attr("id", id);
  $(el).attr("type", "text");

  $(labelForm).append(el);
  return labelForm;
};

function buildForm(assinaturas) {
  var div = document.createElement("div");
  $(div).attr("class", "formulario");

  $(div).append("<h5>Informações Pessoais</h5>")
  $(div).append(createField("fullname", "Nome: "));
  $(div).append(createField("email", "E-mail: "));
  $(div).append(createField("cpf", "CPF: "));

  $(div).append("Nascimento: <br><input type='text' id='birthdate_day' /> / ");
  $(div).append("<input type='text' id='birthdate_month' /> / ");
  $(div).append("<input type='text' id='birthdate_year' />");

  $(div).append("<label>Telefone: <br>(<input type='text' id='ddd' />) <input type='text' id='phone' /></label>");
  $(div).append("<label>Rua <br><input type='text' id='rua' /> Número <input type='text' id='numero' /></label>");
  $(div).append(createField("bairro", "Bairro: "));
  $(div).append(createField("cep", "CEP: "));
  $(div).append(createField("cidade", "Cidade: "));
  $(div).append(createField("estado", "Estado: "));
  $(div).append("<h5>Dados de cobrança</h5>")
  $(div).append(createField("holder_name", "Nome no cartão: "));

  $(div).append("<label>Expiração do cartão: <br><input type='text' id='expiration_month'/> / <input type='text' id='expiration_year' /></label>");
  $(div).append(createField("credit_card", "Cartão: "));

  $(assinaturas).append(div);
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
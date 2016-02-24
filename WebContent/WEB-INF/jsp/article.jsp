<%@ taglib uri='/WEB-INF/tlds/template.tld' prefix='template' %>

<template:insert template='/articleTemplate.jsp'>
  <template:put name='title' content='JSP Templates' direct='true'/>
  <template:put name='header' content='/header.html' />
  <template:put name='sidebar' content='/sidebar.jsp' />
  <template:put name='content' content='/introduction.html'/>
  <template:put name='footer' content='/footer.html' />
</template:insert>

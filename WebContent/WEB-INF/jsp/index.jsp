<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri='/WEB-INF/tlds/template.tld' prefix='template' %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Index </title>
</head>
<body>
<h3>Index con tags</h3>
<a href="/article.jsp"></a>
<template:insert template='/articleTemplate.jsp'>
  <template:put name='title' content='Templates' direct='true'/>
  <template:put name='header' content='/header.html' />
  <template:put name='sidebar' content='/sidebar.jsp' />
  <template:put name='content' content='/introduction.html'/>
  <template:put name='footer' content='/footer.html' />
</template:insert>
</body>
</html>
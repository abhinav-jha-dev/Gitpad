# Cheat Sheat for Coldfusion

## Variables and Datatypes
- `cfset` setting varible

  `<cfset VariableName = "Value" >`
  "" - string values
  '' - char values
  #(pound) - integer, float, double values
 
- `cfdump` getting the value of variable.
 -- `<cfdump var = "#VariableName#" />`
 
 Note: #(pound) is use to execute expresion declared inside it.

- `cfoutput` for outputing the value of variable, expression or function
  -- `<cfoutput>#DateToday#</cfoutput>`
  
 Note: String Concatination can be achieved in two ways `"Today is: #now()#"` or `"Today is: " & now()`

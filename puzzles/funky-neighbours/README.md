# Funky Neighbours
## Rules
* Sudoku
* nonconsecutive
* quads

## Origin
An idea about nonconsecutive Sudokus without roping.

## Status:
* [X] Solution included

## Links
* [SudokuMaker](https://sudokumaker.app/?puzzle=N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQCsJADCADQgAOArgF7MA2KBoOcMnhAMUY4A1gE8ABADkUmAOYALAEYRGGWiDiMEC6ARABhBVEzoAKhHoL0IzBoDGEGHxwJ9gIgJp0eGwkBlRgATCBFGCShGDnQJOHp6NjESAB0cTwB5KB0IOVw4NgSYwIArOHsUVwlA%2BUwEaLgoFAkcCAQJRxx0FHttTAA3FGTU6UYYJTRozBw2zCh7KIkYRnRWsYlIYUCY1o44ZYlcMolJiR1Gsvzo9DUoVRwqnDkThTOZuYGHFAuCAG1QXrzGPwAMwAXxofwB-AA7GCIWxAQQiLCQP94fwAJzI1EI-BkLGQggAJnxaIIADYSTiAByU-gAFlpBBp4JRBPwDJZ2IxjPwMM5bNB-NJ%2BApQpxxLF-DxksRPOlcPFPNFCvpPOZKtlMvwmK1fI1%2BEF%2Br1rOFOv1HP1ypNiq18utwJ5SK16vtRLlasdPLNroNPONXIIFp9VoDIs9WsNPpdoaDof9bLtoYl%2Bu9MY9tp5kbjXvDlp5yZ9qbZIbZBdDibZTvN6f1WbZ8eFVZ9deFDZteedPNjbKLwrxAF06O1llA4JNaj9QAgxPR%2BJRkdPZ4i6A05NgOj9KDQt1uiDQ93vCTQj0ed9v9xfD8fr2fd5fryeaECny%2B6TQ32%2ByDQv1-n3-3wBn7fsB-7Ph%2BAE-sBZI0NB0FQjQ8HwVSNDIchsEwQhmFIShOHoXBWE4ah-YLjO-BEJQFF0IEKBgJMNTrlwIA8Hw%2BjNOEliTHIGiTEwbj4N8g4gEopQiOUgSMYu-AgI41EOBAsmEEwrAcCQcCBIEBi4COY6uJpMD0Lg5QIAAFDgKAAO4SAAIpgYBgGgRl6UokyIOu6B6QZZmuMZADkUBEHAPk0BI3zfFuEh7hIhKDiFRBHhFz4RXSMXfISb5RV%2BUVkv2-YAJS5QA3CkSnsAMakaVpCCjuOHmGd5ZmWTZdkObpTjOTwCBubVXkmX5RBKEFIVhcFkXRcFqWjfFhJAilRCZUQ0ERVCOX5UVOAlSp5WaR0VU6Qg3VGaZFnWbZ9kNK1owuZ1WkHd5fmEoF42pfBUXIVF6IpUC6LBXS4V0kQKVkJFZDxWQM15YVxUsKVqnqdt2k1U4nmHQ1J3Ned%2B1tVdXVI3VvVQISA1PYSL2Em9hIfeNdJvXS30SGQlApXS8V0oldLJRDa0bWVcOVdVF3I-Vx1NWdjlYx1OP6XjvlQECj1DWQ6VkJlZDZeNZKLWSL1klSKVQm9UJ01SjOc1Dyk8xVO385jUs9UdjWnS1Nvta5N243bflAkTCtKyrashVCmVQotULLerdNQuFUIA6b63Q5tvNW3tt0majItO052Nu7bh0%2BfYAWDaF4V00QuvjWTwVAi9dL%2B98qvBWSQcc6tZsw1tfPJ%2B7KPC47GOZxL2eC71%2Bfe0XwUl2XIUU5XNNhyFysN%2BlULgy3cfm7DlsIwL0tp73YuXQPHQp759gPYX3yJXFwWEgD41ApFv0-ZT890zrwWhytkNr23idbzbQ-2zRqLC6LtrpHy7ndU%2Bo8L4jSmrfEKQIWbA0ZuNMgb0tbv2yrHbmG94a7URjnIWDt0b71AZLABec5bn0WnNa%2ByU77pVZsFEGKUyTxWjsFY2n8ubxwtng62x9d4kJAVncBhDh5e2oSNTKaVPqZXZswma6tIqR3fh9WOIAwTSQgROfixE6A8W0FwLRywxAcGMSRJc%2BA5qWOBJQZ80k0ToEnNoqAZkoAECBA4qoa5dHfDfNlZEjg3FoE8dBEAPiajOP4nuZ8X4PpBOgO48k4TIl%2BL3F%2BeCCSWTBOSSKbx1Q-FxJQvo0AuTQnWL3BEwp0SYFviQqU1xeTS5URqT8PcQFdaJJCR4-AVIqlpNqbEjC2SylJIqVSZC1TfG1OKVk4iglTHmPwKALADwOAABlJj8DAHkToIIQTERBEAA)
* [SudokuPad](https://sudokupad.app/5gg8bnwb0a)

## Preview
![Preview](preview.png)

## Intended solution path
-	Start with quad clues:
	-	identify candidates around quads,
	-	between them
	-	and in their respective boxes.
-	Take care of nonconsecutive cells in boxes 1, 3, 7 and 9.
-	Where is 7 in row 3?
-	Take care of nonconsecutive cells in box 3.
-	Where is 6 in column 7?
-	Where is 7 in column 7?
-	Where is 8 in column 7?
-	Where is 4 in column 7?
-	Take care of nonconsecutive cells in box 9.
-	Where is 2 in box 7?
-	Take care of nonconsecutive cells in box 1.
-	Where is 4 in row 7?
-	Where are 3 and 4 in boxes 1 and 7?
-	Take care of nonconsecutive cells in box 7.
-	Where are 3 and 4 in box 4?
-	Where is 5 in box 5?
-	Where is 8 around the quad between boxes 4, 5, 7, 8 and in box 2?
-	Take care of nonconsecutive cells around that quad.
-	Where is 4 in boxes 5 and 8?
-	Where is 5 in row 5?
-	Where is 9 in box 3?
-	Where is 6 in column 1?
-	Where is 8 in box 4?
-	Take care of Quadruple in row 5.
-	At this point box 4 is solved and boxes 1 and 7 consist only of naked singles and pairs.
-	Take care of triple in box 5.
-	Where is 2 in boxes 5 and 6?
-	Take care of nonconsecutive cells in box 5.
-	Complete column 6 and take core of nonconsecutive cells.
-	After some Sudoku basics and cleanup there should be the solved boxes 1, 3, 4, 5, 6, 7 and 9.
-	Complete boxes 2 and 8.


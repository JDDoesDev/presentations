<?php $dir = ".";
$dh = opendir($dir);
?>
<h1>Available Presentations</h1>
<ul>

<?php
while ($f = readdir($dh)) {
  $fullpath = $dir ."/". $f;
  $name = str_replace('-', ' ', $f);
  if ($f{0} == "." || !is_dir($fullpath)) continue;
  echo "<li><a href=\"$fullpath\">" . ucwords($name) . "</a></li>\n";
}
closedir($dh);
?>
</ul>

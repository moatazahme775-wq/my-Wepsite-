#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="mouaz-alalqami-blog-fixed"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

cat > README.md <<'EOF'
انسخ محتويات الملف المضغوط الجاهز بدل استخدام هذا السكربت، أو استخدم هذا السكربت كمرجع.
EOF

echo "استخدم ملفات المشروع داخل الملف المضغوط الجاهز."
